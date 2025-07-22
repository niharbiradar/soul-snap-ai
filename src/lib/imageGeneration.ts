// This file provides access to Lovable's built-in image generation
// The generate_image function is provided by the Lovable platform
declare global {
  function generate_image(params: {
    prompt: string;
    target_path: string;
    width?: number;
    height?: number;
    model?: string;
  }): Promise<void>;
}

export { generate_image };