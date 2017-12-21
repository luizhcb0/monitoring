class Dimension < ApplicationRecord
  belongs_to :device

  after_create :set_volume

  # def volume
  #   self[:x] * self[:y] * self[:z] * 1000
  # end

  def self.get_tank_volume(device_id)
    tank = where(device_id: device_id)
    tank = tank.first
    volume = tank.x * tank.y * tank.z * 1000
    return volume
  end

  def self.get_all_volumes
    tanks = Array.new
    Device.all.each do |device|
      tanks <<  where(device_id: device.id)
    end
    return tanks
  end

  private
    def set_volume
      self.update_attributes(volume: self[:x] * self[:y] * self[:z] * 1000) if self.volume.nil?
    end

end
