class Device < ApplicationRecord
  has_many :levels
  belongs_to :user
  
  enum position: %w(top bottom)
  
  def self.get_top_devices
    where(position: "top")
  end
  
  def self.get_bottom_devices
    where(position: "bottom")
  end
end
