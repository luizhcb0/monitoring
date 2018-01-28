class Setting < ApplicationRecord
  belongs_to :user

  enum theme: %w(white_theme/application dark_theme/application)
end
