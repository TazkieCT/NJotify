package model

type Artist struct {
	UserId      string `gorm:"type:uuid;primary_key"`
	BannerImage string `gorm:"type:text;"`
	About       string `gorm:"type:text;"`
	User        User   `gorm:"foreignKey:UserId;constraint:OnUpdate:CASCADE,OnDelete:CASCADE;"`
}
