from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in eden_app/__init__.py
from eden_app import __version__ as version

setup(
	name="eden_app",
	version=version,
	description="ee",
	author="ee",
	author_email="e",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
