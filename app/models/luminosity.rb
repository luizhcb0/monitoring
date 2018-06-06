class Luminosity < ApplicationRecord
  belongs_to :device

  def self.get_luminosities(device_id)
    data = Array.new
    now = DateTime.now
    data = where(device_id: device_id, created_at: (now - 2.day)..now).order(created_at: :asc)
    return data
  end
end
