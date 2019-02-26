# README

* Database creation

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|varchar|null: false, unique: true|
|email_password|varchar|null: false|

### Association
- has_many :groups, through: :members
- has_many :messages
- has_many :members


## groupsテーブル


|Column|Type|Options|
|------|----|-------|
|name|string|null: false, unique: false|

### Association
- has_many :users, through: :members
- has_many :messages
- has_many :members


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user_id|integer|null: false, foreign_key: true, index: true|
|group_id|integer|null: false, foreign_key: true|


### Association
- belongs_to :user
- belongs_to :group


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true, index: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user



