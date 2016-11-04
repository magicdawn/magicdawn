{% extends '_layouts/page.swig' %}

{% block body %}

{{ JSON.stringify(collections) }}

<ul>
  {% for p in collections.posts %}
    <li>
      <p>{{ p.title }}</p>
    </li>
  {% endfor %}
</ul>
{% endblock %}