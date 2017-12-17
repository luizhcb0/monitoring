class Device < ApplicationRecord
  has_many :levels
  has_one :dimension
  belongs_to :user

  validates_uniqueness_of :serial, {message: "O Número de Série já existe"}
  validates_format_of :serial, with: /\d{4}-\d{4}-\d{2}/,
    message: "O Número de Série não está no formato correto"

  enum position: %w(top bottom)
  enum model: %w(water_level)

  def self.get_top_devices
    where(position: "top")
  end

  def self.get_bottom_devices
    where(position: "bottom")
  end

  def self.get_all_user_dimensions(user_id)
    dimensions = Array.new
    Device.where(user_id: user_id).each do |device|
      dimensions <<  device.dimension
    end
    return dimensions
  end

  def self.get_user_devices(user_id)
    where(user_id: user_id)
  end
end
