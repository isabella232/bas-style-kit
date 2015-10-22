# Plugin to add environment variables to the `site` object in Liquid templates
# Source: https://gist.github.com/nicolashery/5756478

module Jekyll

  class EnvironmentVariablesGenerator < Generator

    def generate(site)

      site.config['repo'] = ENV['REVISION'] || 'unknown'

    end

  end

end
