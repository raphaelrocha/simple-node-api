import { exec } from 'child_process';
class ConverterController {
  async converter() {
    console.log('read file');
    // const buffer = fs.readFileSync(`${process.cwd()}/PACK17.mov`, );
    // console.log(buffer);

    const filePath =
      '/Users/raphaelrocha/Downloads/audio-orchestrator-ffmpeg/bin';
    // fs.unlinkSync(filePath);

    await new Promise((resolve) => {
      exec('cd ' + filePath + ' && ' + 'rm output.mp4', () => {
        resolve(true);
      });
    });

    const convert: any = await new Promise((resolve, reject) => {
      exec(
        'cd ' + filePath + ' && ' + 'ffmpeg -i input.mov -q:v 0 output.mp4',
        (error, stdout, stderr) => {
          if (error) {
            console.log('OUTPUT FFMPEG ERROR');
            reject(error);
          } else {
            console.log('OUTPUT FFMPEG');
            console.log(error, stdout, stderr);

            resolve({
              filePath: `${filePath}/output.mp4`,
            });
          }
        },
      );
    });

    console.log(convert);
    return convert.filePath;
  }
}

export const converterController = new ConverterController();
