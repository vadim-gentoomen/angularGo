package models

import "github.com/jinzhu/gorm"

var Admin Role
var User Role

type Role struct {
	gorm.Model
	Name string `sql:"not null; unique;"`
}

func init() {
	db.FirstOrCreate(&Admin, Role{Name: "Administrator"})
	db.FirstOrCreate(&User, Role{Name: "User"})
}
