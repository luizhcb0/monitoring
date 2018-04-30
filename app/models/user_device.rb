class UserDevice < ApplicationRecord
  belongs_to :user
  belongs_to :device

  def with_user(user)
    self.user = user
    self # returns the object
  end
end
