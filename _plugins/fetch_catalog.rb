
require 'open-uri'

module Fetch_Catalog
  class Generator < Jekyll::Generator
    def generate(site)
      site.data['catalog'] = JSON.load(open('https://manubot.github.io/catalog/catalog.json'))
    end
  end
end