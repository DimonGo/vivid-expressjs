package trivy

import data.lib.trivy

default ignore=false

# https://github.com/aquasecurity/trivy/pull/6004/files
# Examples
# ignore {
#  input.Name == "GPL-3.0"
#  input.FilePath == "usr/share/gcc/python/libstdcxx/v6/printers.py"
# }

# ignore {
#   input.RuleID == "generic-ignored-rule"
#   input.Title == "Secret should be ignored"
# }

# ignore {
#  input.PkgName == "@vendor/package"
#  input.Name == "MIT"
# }


ignore {
  input.PkgName == "@img/sharp-win32-x64"
  input.Name == "Apache-2.0 AND LGPL-3.0-or-later"
}

ignore {
  input.PkgName == "@img/sharp-libvips-darwin-x64"
  input.Name == "LGPL-3.0-or-later"
}

# mapbox-gl
ignore {
  input.PkgName == "mapbox-gl"
  input.Name == "SEE LICENSE IN LICENSE.txt"
}

# fortawesome
ignore {
  input.PkgName == "@fortawesome/free-brands-svg-icons"
  input.Name == "(CC-BY-4.0 AND MIT)"
}
