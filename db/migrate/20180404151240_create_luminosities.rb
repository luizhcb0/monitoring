class CreateLuminosities < ActiveRecord::Migration[5.0]
  def change
    create_table :luminosities do |t|
      t.belongs_to :device, null: false, index: true, foreign_key: {on_delete: :cascade}
      t.float :data, null: false
      t.timestamps
    end
  end
end