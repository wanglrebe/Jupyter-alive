import os
from jsmin import jsmin
import argparse
from datetime import datetime

def minify_js(input_file, output_file):
    """
    读取 JavaScript 源文件并生成压缩版本
    """
    try:
        # 读取源文件
        with open(input_file, 'r', encoding='utf-8') as f:
            source = f.read()
        
        # 压缩代码
        minified = jsmin(source)
        
        # 写入压缩文件
        with open(output_file, 'w', encoding='utf-8') as f:
            # 添加一个简单的文件头注释
            f.write(f'// Minified on {datetime.now().strftime("%Y-%m-%d %H:%M:%S")}\n')
            f.write(minified)
        
        # 获取文件大小
        original_size = len(source)
        minified_size = len(minified)
        compression_ratio = (1 - minified_size / original_size) * 100
        
        print(f'\n压缩成功！')
        print(f'源文件大小: {original_size:,} 字节')
        print(f'压缩后大小: {minified_size:,} 字节')
        print(f'压缩率: {compression_ratio:.1f}%')
        print(f'输出文件: {output_file}')
        
    except Exception as e:
        print(f'错误: {str(e)}')
        return False
    
    return True

def main():
    # 设置命令行参数
    parser = argparse.ArgumentParser(description='JavaScript 代码压缩工具')
    parser.add_argument('-i', '--input', default='timeout-controller.js',
                      help='输入文件名 (默认: timeout-controller.js)')
    parser.add_argument('-o', '--output', default='timeout-controller.min.js',
                      help='输出文件名 (默认: timeout-controller.min.js)')
    
    args = parser.parse_args()
    
    # 检查输入文件是否存在
    if not os.path.exists(args.input):
        print(f'错误: 找不到输入文件 "{args.input}"')
        return
    
    print(f'正在压缩 {args.input} ...')
    minify_js(args.input, args.output)

if __name__ == '__main__':
    main()