class Device < ApplicationRecord
  has_many :levels
  has_one :dimension
  belongs_to :user
  accepts_nested_attributes_for :dimension, allow_destroy: true

  after_create :set_first_level

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

  def self.get_all_user_dimensions(user)
    dimensions = Array.new
    user.devices.each do |device|
      dimensions <<  device.dimension
    end
    return dimensions
  end

  private
    def set_first_level
      d = Dimension.create(x: 2, y: 0.5, z: 0.5, volume: 1000, device_id: self.id) if self.dimension.nil?
      Level.create(device_id: self.id, level: d.y)
    end
end
