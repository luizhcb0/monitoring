class RemoveTimeBetweenClFromDevices < ActiveRecord::Migration[5.0]
  def change
    remove_column :devices, :time_between_cl, :datetime
    remove_column :devices, :last_cl, :datetime
    remove_column :devices_users, :last_critical_level, :datetime
  end
end
