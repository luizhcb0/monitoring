class Level < ApplicationRecord
  belongs_to :device
  has_many :last_levels, :class_name => 'EmailLog', :foreign_key => 'last_level_id'
  has_many :new_levels, :class_name => 'EmailLog', :foreign_key => 'new_level_id'
  after_create :set_high_and_percentage

  def self.get_current_level(device_id)
    created_at = where(device_id: device_id).maximum(:created_at)
    level = find_by(created_at: created_at, device_id: device_id)
  end

  def self.get_all_current_levels(user_id)
    levels = Array.new
    Device.left_outer_joins(:users).where(users: {id: user_id}, devices: {model: "water_level"}).each do |device|
    # Device.where(user_id: user_id).each do |device|
      levels <<  where(device_id: device.id).maximum(:created_at)
    end
    return levels
  end

  def self.get_all_devices_levels
    levels = Array.new
    Device.all.each do |device|
      levels <<  where(device_id: device.id, model: "water_level")
    end
    return levels
  end

  def self.get_all_user_devices_levels(user_id)
    levels = Array.new
    now = DateTime.now
    Device.left_outer_joins(:users).where(users: {id: user_id}, devices: {model: "water_level"}).each do |device|
      levels <<  where(device_id: device.id, created_at: (now - 1.day)..now).order(created_at: :asc)
    end
    return levels
  end

  def self.get_all_user_devices_levels_history(user_id)
    levels = Array.new
    Device.left_outer_joins(:users).where(users: {id: user_id}, devices: {model: "water_level"}).each do |device|
      levels <<  where(device_id: device.id).order(created_at: :asc)
    end
    return levels
  end

  def self.get_all_levels(device_id)
    levels = where(device_id: device_id)
    return levels
  end

  def set_percentage(percentage)
    self.update_attributes(
      percentage: percentage,
      level: self.device.dimension.y - (self.device.dimension.y * percentage)/100,
      y: (self.device.dimension.y * (percentage))/100
    )
  end

  private
    def set_high_and_percentage
      device = Device.find(self.device_id)
      if self.level.present?
        self.update_attributes(y: device.dimension.y - self.level, percentage: (100*(device.dimension.y - self.level)/device.dimension.y).round(2))
      else
        self.update_attributes(y: nil, percentage: nil)
      end
    end

end
