package models

import (
	"angularGo/utils"
	"github.com/dgrijalva/jwt-go"
	"github.com/jinzhu/gorm"
	"golang.org/x/crypto/bcrypt"
	"os"
	"regexp"
)

type Token struct {
	UserId uint
	jwt.StandardClaims
}

type Account struct {
	gorm.Model
	Name     string
	Email    string
	Password string
	Token    string `sql:"-"`
	Roles    []Role `gorm:"many2many:account_roles;"`
}

type AccountJson struct {
	Name  string   `json:"name"`
	Email string   `json:"email"`
	Token string   `json:"token"`
	Roles []string `json:"roles"`
}

func (account *Account) Account2J() AccountJson {
	var roles []string
	for _, role := range account.Roles {
		roles = append(roles, role.Name)
	}
	return AccountJson{
		Name:  account.Name,
		Email: account.Email,
		Token: account.Token,
		Roles: roles,
	}
}

func (account *Account) Validate() (map[string]interface{}, bool) {

	if !validateEmail(account.Email) {
		return utils.Message(false, "Email address is required"), false
	}

	if len(account.Password) < 6 {
		return utils.Message(false, "Password is required"), false
	}

	//Email must be unique
	temp := &Account{}

	//check for errors and duplicate emails
	err := GetDB().Table("accounts").Where("email = ?", account.Email).First(temp).Error
	if err != nil && err != gorm.ErrRecordNotFound {
		return utils.Message(false, "Connection error. Please retry"), false
	}
	if temp.Email != "" {
		return utils.Message(false, "Email address already in use by another user."), false
	}

	return utils.Message(false, "Requirement passed"), true
}

func (account *Account) Create() map[string]interface{} {
	if resp, ok := account.Validate(); !ok {
		return resp
	}

	hashedPassword, _ := bcrypt.GenerateFromPassword([]byte(account.Password), bcrypt.DefaultCost)
	account.Password = string(hashedPassword)

	account.Roles = []Role{User} // только User по умолчанию

	//GetDB().Preload("Roles").First(account)
	GetDB().Create(account)

	if account.ID <= 0 {
		return utils.Message(false, "Failed to create account, connection error.")
	}

	tk := &Token{UserId: account.ID}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))
	account.Token = tokenString

	response := utils.Message(true, "Account has been created")
	response["account"] = account.Account2J()
	return response
}

func Login(email, password string) map[string]interface{} {

	if !validateEmail(email) {
		return utils.Message(false, "Email address is required")
	}

	account := &Account{}
	GetDB().Preload("Roles").First(account)
	err := GetDB().Table("accounts").Where("email = ?", email).First(account).Error
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return utils.Message(false, "Email address not found")
		}
		return utils.Message(false, "Connection error. Please retry")
	}

	err = bcrypt.CompareHashAndPassword([]byte(account.Password), []byte(password))
	if err != nil && err == bcrypt.ErrMismatchedHashAndPassword { //Password does not match!
		return utils.Message(false, "Invalid login credentials. Please try again")
	}

	tk := &Token{UserId: account.ID}
	token := jwt.NewWithClaims(jwt.GetSigningMethod("HS256"), tk)
	tokenString, _ := token.SignedString([]byte(os.Getenv("token_password")))
	account.Token = tokenString

	resp := utils.Message(true, "Logged In")
	resp["account"] = account.Account2J()
	return resp
}

func validateEmail(email string) bool {
	Re := regexp.MustCompile(`^[a-z0-9._%+\-]+@[a-z0-9.\-]+\.[a-z]{2,4}$`)
	return Re.MatchString(email)
}
