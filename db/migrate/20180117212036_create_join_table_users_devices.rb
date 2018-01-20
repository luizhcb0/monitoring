class CreateJoinTableUsersDevices < ActiveRecord::Migration[5.0]
  def change
    create_join_table :devices, :users, id: false do |t|
      # t.index [:user_id, :device_id]
      # t.index [:device_id, :user_id]
      t.references :user, index: true, foreign_key: {on_delete: :cascade}
      t.references :device, index: true, foreign_key: {on_delete: :cascade}
    end
  end
end
