package model

type Track struct {
	ID        uint   `gorm:"primaryKey"`
	TrackName string `gorm:"not null"`
	AlbumID   uint   `gorm:"not null"`
	Album     Album  `gorm:"foreignKey:AlbumID"`
}
