class EmailLog < ApplicationRecord
  belongs_to :last_level, class_name: 'Level'
  belongs_to :new_level, class_name: 'Level'
  belongs_to :user
  belongs_to :device

  enum alert_type: %w(normal alert)
end
