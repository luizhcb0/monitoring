class Level < ApplicationRecord
  belongs_to :device
  
  after_create :set_high_and_percentage
  
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
    def set_high_and_percentage
      device = Device.find(self.device_id)
      self.update_attributes(y: device.dimension.y - self.level, percentage: (100*(device.dimension.y - self.level)/device.dimension.y).round(2))
    end
    
end
