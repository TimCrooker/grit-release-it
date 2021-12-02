import path from "path"
import { GeneratorConfig } from "grit-cli"

export = {
  prompts(grit) {
		this.input({
			name: 'name',
			message: 'What is the name of the new project',
			default: `${path.basename(grit.outDir)}`,
			filter: val => val.toLowerCase(),
		})
		this.input({
			name: 'description',
			message: 'How would you describe the new template',
			default: `my awesome NEW generator`
		})
		this.input({
			name: 'username',
			message: 'What is your GitHub username',
			default: grit.gitUser.username || grit.gitUser.name,
			filter: val => val.toLowerCase(),
			store: true
		})
		this.input({
			name: 'email',
			message: 'What is your email?',
			default: grit.gitUser.email,
			store: true
		})
		this.input({
			name: 'website',
			message: 'The URL of your website',
			default(data) {
				return `github.com/${data.answers.username}`
			},
			store: true
		})
  },
  actions() {
		this.add({
      files: '**'
    })
    this.move({
      patterns: {
				'_package.json': 'package.json'
      }
    })
	},
  async completed(grit) {
    grit.gitInit()
    await grit.npmInstall()
    grit.showProjectTips()
  }
} as GeneratorConfig