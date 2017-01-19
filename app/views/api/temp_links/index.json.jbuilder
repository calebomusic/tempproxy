json.array! @temp_links do |temp_link|
  json.partial! 'api/temp_links/temp_link', temp_link: temp_link
end
