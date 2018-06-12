class AtmPressure < ApplicationRecord
  belongs_to :device

  def self.get_current_atm_pressure(device_id)
    created_at = where(device_id: device_id).maximum(:created_at)
    atm_pressure = find_by(created_at: created_at, device_id: device_id)
  end

  def self.get_atm_pressures(device_id)
    data = Array.new
    now = DateTime.now
    data = where(device_id: device_id, created_at: (now - 2.day)..now).order(created_at: :asc)
    return data
  end
end
