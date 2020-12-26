from setuptools import setup


with open('README.rst') as readme_file:
    long_description = readme_file.read()


setup(
    name='big_O',
    version='0.10.1',
    description='Empirical estimation of time complexity from execution time',
    author='Serhat Aras',
    author_email='srharas@gmail.com',
    url='https://gitlab.com/kagankartalobss/code-frontation-backend/-/tree/master/python_src/asymptotic_notation',
    license='',
    long_description=long_description,
    long_description_content_type='text/x-rst',
    packages=['big_o', 'big_o.test'],
    install_requires=['numpy']
)
