class CreateTempLinks < ActiveRecord::Migration
  def change
    create_table :temp_links do |t|
      t.integer :proxy_id, null: false
      t.integer :clicks, null: false

      t.timestamps
    end

    add_index :temp_links, :proxy_id
  end
end
