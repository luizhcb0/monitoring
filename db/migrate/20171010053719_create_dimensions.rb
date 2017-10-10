class CreateDimensions < ActiveRecord::Migration[5.0]
  def change
    create_table :dimensions do |t|
      t.belongs_to :device, index: true, foreign_key: {on_delete: :cascade}
      t.float :x, null: false
      t.float :y, null: false
      t.float :z, null: false
      t.float :volume
      t.timestamps
    end
  end
end
