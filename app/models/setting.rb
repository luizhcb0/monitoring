class Setting < ApplicationRecord
  belongs_to :user

  enum active: %(no yes)
end
