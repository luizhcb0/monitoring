class Device < ApplicationRecord
  has_many :levels
  has_many :humidities
  has_many :atm_pressures
  has_many :luminosities
  has_many :temperatures

  has_one :dimension
  has_many :user_devices
  has_many :users, through: :user_devices
  has_many :email_logs
  accepts_nested_attributes_for :dimension, allow_destroy: true

  after_create :set_first_level

  validates_uniqueness_of :serial, {message: "O Número de Série já existe"}
  validates_format_of :serial, with: /\d{4}-\d{4}-\d{2}/,
    message: "O Número de Série não está no formato correto"

  enum position: %w(top bottom)
  enum model: %w(water_level sigfox)

  def self.get_all_user_dimensions(user)
    dimensions = Array.new
    user.devices.each do |device|
      if device.model == "water_level"
        dimensions <<  device.dimension
      end
    end
    return dimensions
  end

  def self.get_water_level_devices(user)
    user.devices.where(model: "water_level")
  end

  def self.get_sigfox_devices(user)
    user.devices.where(model: "sigfox")
  end

  def self.get_all_current_weather_info(devices)
    infos = Array.new
    devices.each do |device|
      info = Array.new
      info << Device.find(device.id)
      info << Temperature.where(device: device).last
      info << Humidity.where(device: device).last
      info << Luminosity.where(device: device).last
      info << AtmPressure.where(device: device).last
      infos << info
    end
    return infos
  end

  private
    def set_first_level
      if self.model == "water_level"
        if self.dimension.nil?
          d = Dimension.create(x: 2, y: 0.5, z: 0.5, volume: 1000, device: self)
          Level.create(device: self, level: d.y)
        else
          Level.create(device: self, level: self.dimension.y)
        end
      end
    end
end
