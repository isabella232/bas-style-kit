# Plugin to list directories within '/versions/' directory to display as an index
# Source: https://gist.github.com/nicolashery/5756478

module Jekyll

  class VersionIndexGenerator < Generator

    def generate(site)

      # Get all directories at a given path (to a single depth)
      Dir.chdir('./site/versions')
      site.config['versions'] = Dir.glob('*').select {|f| File.directory? f}

    end

  end

end
