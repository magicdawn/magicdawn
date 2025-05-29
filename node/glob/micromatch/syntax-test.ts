import mm from 'micromatch'

{
  const pattern = '*.?(c|m)(j|t)s?(x)'
  console.log(mm([import.meta.filename], pattern, { matchBase: true }))
}

{
  const pattern = '*.{?(c|m)(j|t)s?(x),y?(a)ml,md}'
  console.log(mm([import.meta.filename, 'test.yml', 'test.yaml', 'test.md'], pattern, { matchBase: true }))
}
