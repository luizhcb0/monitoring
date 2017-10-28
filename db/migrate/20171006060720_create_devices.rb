class CreateDevices < ActiveRecord::Migration[5.0]
  def change
    create_table :devices do |t|
      t.belongs_to :user, index: true, foreign_key: {on_delete: :cascade}
      t.string :address, null: false
      t.integer :position, null: false
      t.integer :order, null: false
      t.timestamps
    end
  end
end
