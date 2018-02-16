class RemoveTimeBetweenClFromDevices < ActiveRecord::Migration[5.0]
  def change
    remove_column :devices, :time_between_cl, :datetime
  end
end
