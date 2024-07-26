package model

type Album struct {
	ID        uint   `gorm:"primaryKey"`
	UserID    uint   `gorm:"not null"`
	User      User   `gorm:"foreignKey:UserID"`
	AlbumName string `gorm:"not null"`
	Tracks    []Track
}
