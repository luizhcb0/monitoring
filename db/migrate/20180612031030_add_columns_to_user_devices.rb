class AddColumnsToUserDevices < ActiveRecord::Migration[5.0]
  def change
    add_column :user_devices, :last_critical_temperature, :datetime
    add_column :user_devices, :last_critical_humidity, :datetime
    add_column :user_devices, :last_critical_atm_pressure, :datetime
    add_column :user_devices, :last_critical_luminosity, :datetime
  end
end
