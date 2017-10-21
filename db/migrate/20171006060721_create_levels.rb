class CreateLevels < ActiveRecord::Migration[5.0]
  def change
    create_table :levels do |t|
      t.belongs_to :device, null: false, index: true, foreign_key: {on_delete: :cascade}
      t.float :level, null: false
      t.float :y
      t.float :percentage
      t.timestamps
    end
  end
end
