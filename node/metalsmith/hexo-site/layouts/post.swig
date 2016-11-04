<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>{{ title }} | Awesome Site</title>
</head>
<body>
  <div class="main-wrapper">
    {{ contents | safe }}
    <p>
      created at {{ date }}
    </p>
  </div>
</body>
</html>