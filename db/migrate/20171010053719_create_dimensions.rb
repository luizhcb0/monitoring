class CreateDimensions < ActiveRecord::Migration[5.0]
  def change
    create_table :dimensions do |t|
      t.belongs_to :device, index: true, foreign_key: {on_delete: :cascade}
      t.float :x
      t.float :y
      t.float :z
      t.float :volume
      t.timestamps
    end
  end
end
