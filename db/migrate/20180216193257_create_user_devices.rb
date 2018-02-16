class CreateUserDevices < ActiveRecord::Migration[5.0]
  def change
    create_table :user_devices do |t|
      t.belongs_to :user, null: false, index: true, foreign_key: {on_delete: :cascade}
      t.belongs_to :device, null: false, index: true, foreign_key: {on_delete: :cascade}
      t.datetime :last_critical_level, null: true
    end
    add_index :user_devices, [:user_id, :device_id], unique: true
  end
end
