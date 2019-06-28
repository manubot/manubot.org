require 'open-uri'

module Jekyll_Get
  class Generator < Jekyll::Generator
    def generate(site)
      config = site.config['jekyll_get']
      if !config
        return
      end
      site.data[config['data']] = JSON.load(open(config['json']))
    end
  end
end