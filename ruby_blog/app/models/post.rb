class Post < ActiveRecord::Base
  has_many :comments
  validates :title, presence: true,
                    length: { minimun: 5 }
end
