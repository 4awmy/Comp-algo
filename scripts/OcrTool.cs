using System;
using System.IO;
using System.Threading.Tasks;
using Windows.Media.Ocr;
using Windows.Graphics.Imaging;
using Windows.Storage;
using Windows.Storage.Streams;

class Program
{
    static int Main(string[] args)
    {
        if (args.Length < 1)
        {
            Console.Error.WriteLine("Error: Missing image path argument.");
            Console.Error.WriteLine("Usage: OcrTool.exe <image_path>");
            return 1;
        }

        string imagePath = args[0];
        if (!File.Exists(imagePath))
        {
            Console.Error.WriteLine("Error: File not found: " + imagePath);
            return 2;
        }

        try
        {
            string text = RecognizeAsync(imagePath).GetAwaiter().GetResult();
            Console.WriteLine(text);
            return 0;
        }
        catch (Exception ex)
        {
            Console.Error.WriteLine("Error during OCR: " + ex.ToString());
            return 3;
        }
    }

    static async Task<string> RecognizeAsync(string imagePath)
    {
        string fullPath = Path.GetFullPath(imagePath);
        StorageFile file = await StorageFile.GetFileFromPathAsync(fullPath);
        using (IRandomAccessStream stream = await file.OpenAsync(FileAccessMode.Read))
        {
            BitmapDecoder decoder = await BitmapDecoder.CreateAsync(stream);
            using (SoftwareBitmap bitmap = await decoder.GetSoftwareBitmapAsync())
            {
                Console.Error.WriteLine("Debug: Original Bitmap Format = " + bitmap.BitmapPixelFormat + ", Alpha = " + bitmap.BitmapAlphaMode);

                // Convert to Bgra8 if not already in a supported format
                SoftwareBitmap bgra8Bitmap = bitmap;
                bool needConvert = bitmap.BitmapPixelFormat != BitmapPixelFormat.Bgra8 ||
                                   bitmap.BitmapAlphaMode != BitmapAlphaMode.Premultiplied;
                if (needConvert)
                {
                    Console.Error.WriteLine("Debug: Converting bitmap to Bgra8 Premultiplied...");
                    bgra8Bitmap = SoftwareBitmap.Convert(bitmap, BitmapPixelFormat.Bgra8, BitmapAlphaMode.Premultiplied);
                }

                try
                {
                    Console.Error.WriteLine("Debug: Bitmap Size = " + bgra8Bitmap.PixelWidth + "x" + bgra8Bitmap.PixelHeight);

                    var languages = OcrEngine.AvailableRecognizerLanguages;
                    Console.Error.WriteLine("Debug: Available OCR Languages:");
                    foreach (var lang in languages)
                    {
                        Console.Error.WriteLine("  - " + lang.LanguageTag);
                    }

                    OcrEngine engine = OcrEngine.TryCreateFromUserProfileLanguages();
                    if (engine == null)
                    {
                        throw new Exception("OcrEngine could not be created.");
                    }
                    Console.Error.WriteLine("Debug: Created OcrEngine with language: " + engine.RecognizerLanguage.LanguageTag);

                    OcrResult result = await engine.RecognizeAsync(bgra8Bitmap);
                    Console.Error.WriteLine("Debug: OCR Result Lines Count = " + result.Lines.Count);
                    if (result.Lines.Count > 0)
                    {
                        foreach (var line in result.Lines)
                        {
                            Console.Error.WriteLine("Debug: Line text = \"" + line.Text + "\"");
                        }
                    }
                    return result.Text;
                }
                finally
                {
                    if (needConvert && bgra8Bitmap != null)
                    {
                        bgra8Bitmap.Dispose();
                    }
                }
            }
        }
    }
}

