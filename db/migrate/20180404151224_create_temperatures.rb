class CreateTemperatures < ActiveRecord::Migration[5.0]
  def change
    create_table :temperatures do |t|
      t.belongs_to :device, null: false, index: true, foreign_key: {on_delete: :cascade}
      t.float :data, null: false
      t.timestamps
    end
  end
end
