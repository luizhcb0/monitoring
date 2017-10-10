class Level < ApplicationRecord
  belongs_to :device
  
  after_create :set_y
  
  def self.get_current_level(device_id)
    where(device_id: device_id).maximum(:id)
  end
  
  def self.get_all_current_levels
    levels = Array.new
    Device.all.each do |device|
      levels <<  where(device_id: device.id).maximum(:id)
    end
    return levels
  end
  
  def self.get_all_devices_levels
    levels = Array.new
    Device.all.each do |device|
      levels <<  where(device_id: device.id)
    end
    return levels
  end
  
  def self.get_all_levels(device_id)
    levels = where(device_id: device_id)
    return levels
  end
  
  private
    def set_y
      device = Device.find(self.device_id)
      self.update_attributes(y: device.dimension.y - self.level)
    end
end
