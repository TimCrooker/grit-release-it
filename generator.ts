import { GeneratorConfig } from "grit-cli"

export = {
	prepare(grit) {
		// if there is not a project at the outdir then exit the generator with error
		if(!grit.pkg) {
			throw new Error("This generator is meant to be run in existing projects but there is no package.json detected.")
		}
	},
	prompts() {
		this.confirm({
			plugin: true,
			name: 'npm-publish',
			message: 'Do you want to publish to npm?'
		})

		this.confirm({
			plugin: true,
			name: 'git-push',
			message: 'Do you want to push git to remote?'
		})
		
		this.confirm({
			plugin: true,
			name: 'github-release',
			message: 'Do you want to release to github?'
		})

	},
	data() {
		
	},
	plugins: {
		mergeFiles: ['.release-it.json']
	},
  actions(grit) {
		this.add({
      files: '**'
    })

		this.modify({
			files: 'package.json',
			handler: (data) => {
				return grit.mergeObjects(data, [{
					scripts: {
						release: "release-it"
					},
					devDependencies: {
						"release-it": "^14.11.8"
					}
				}])
			}
		})
	},
  async completed(grit) {
    await grit.npmInstall()
  }
} as GeneratorConfig