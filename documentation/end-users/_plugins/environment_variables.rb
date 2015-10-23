# Plugin to add environment variables to the `site` object in Liquid templates
# Source: https://gist.github.com/nicolashery/5756478

module Jekyll

  class EnvironmentVariablesGenerator < Generator

    def generate(site)

      # If set, take the first 7 characters of the current revision
      site.config['revision'] = ENV['REVISION'][0..6] || 'unknown'

    end

  end

end
