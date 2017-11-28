class CreateSettings < ActiveRecord::Migration[5.0]
  def change
    create_table :settings do |t|
      t.belongs_to :user, index: true, foreign_key: {on_delete: :cascade}
      t.float :alert_level
      t.boolean :active, default: false
      t.timestamps
    end
  end
end
