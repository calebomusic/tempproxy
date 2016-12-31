class ChangeProxiesForFst < ActiveRecord::Migration
  def change
    add_column :proxies, :flags, :integer, :null => false, :default => 0
  end
end
