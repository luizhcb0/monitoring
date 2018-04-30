class AddColumnDescriptionToUserDevices < ActiveRecord::Migration[5.0]
  def change
    add_column :user_devices, :description, :string
    remove_column :devices, :description, :string
  end
end
